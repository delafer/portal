import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService, UserContextContextService} from '$app/core/services';
import {MessageboxComponent} from '$shared/components/messagebox/messagebox.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NamingService} from '$service/naming.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private namingService: NamingService,
    private ctx: UserContextContextService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  forget($event): void {
    $event.preventDefault();
  }

  onSubmit() {
    this.submitted = true;
    console.log('Entering home area!');

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Invalid form');
      return;

    }

    console.log(`user: ${this.f.username.value}, pwd: ${this.f.password.value}`);

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(`next step redirect to home page: ${this.returnUrl}`);
          this.openMessageBox();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('Error during login');
          this.error = error;
          this.loading = false;
        });
  }

  private openMessageBox() {
    const modalRef = this.modalService.open(MessageboxComponent, { windowClass: 'dark-modal', centered: true});
    this.namingService.getUserIP(function(name){
      modalRef.componentInstance.name = name;
    });
    this.ctx.getByName(this.loginForm.value.username).subscribe(
      (result) => {
        modalRef.componentInstance.text = result.text;
      }
    )
  }

  onKeyPress($event: KeyboardEvent) {
    //console.log(JSON.stringify($event))
    if ($event.key && $event.key == "Enter") {
      this.onSubmit();
    }
    // if(event == 13) {
    //   this.onSubmit();
    // }
  }
}
