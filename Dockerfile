FROM anapsix/alpine-java
VOLUME /tmp
#ARG DEPENDENCY=target/dependency
#COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
#COPY ${DEPENDENCY}/META-INF /app/META-INF
#COPY ${DEPENDENCY}/BOOT-INF/classes /app
COPY  target/portal-full-app-0.0.1-SNAPSHOT.war portal-full-app.war
RUN bash -c 'touch /portal-full-app.war'
#ENTRYPOINT ["java","-cp","app:app/lib/*","de.creditreform.ht.akte.AkteApplication"]
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/portal-full-app.war"]