package de.creditreform.app.model;

import java.math.BigDecimal;
import java.util.Random;

/**
 * The Class RandomUtil.
 *
 * @author  tavrovsa
 * @version $Revision: #4 $
 */
public final class RandomUtil {

    /** The Constant RANDOMIZER. */
    private static final long INITIAL_PSEUDO_SEED = System.currentTimeMillis() + Runtime.getRuntime().freeMemory() + System.identityHashCode(new Object());

    private static final Random RANDOMIZER = new Random(INITIAL_PSEUDO_SEED);

    static final char[] SEED = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-+<>"
            .toCharArray();

    /**
     * Gets the random.
     *
     * @return the random
     */
    public static final Random getRandom() {

        return RANDOMIZER;
    }

    /**
     * Returns a random number between start and end, inclusive.
     *
     * @param min the start
     * @param max the end
     * @return the random int value
     */
    public static int getRandomInt(int min, int max) {

        int span = max - min;
        int randint = getRandom().nextInt(span + 1);
        return min + randint;
    }

    /**
     * get a random double with the range [min, max].
     *
     * @param min the minimum value
     * @param max the maximum value
     * @return the random double value
     */
    public static double getRandomDouble(double min, double max) {

        // include min, include max
        double result = min + (getRandom().nextDouble() * (1d + max - min));
        return result;
    }

    /**
     * Returns a pseudorandom, uniformly distributed <code>float</code> value between <code>min</code> (inclusive) and
     * <code>max</code> (inclusive).
     *
     * @param min the low value
     * @param max the high value
     * @return the random float
     */
    public static float getRandomFloat(float min, float max) {

        return min + (getRandom().nextFloat() * (max - min));
    }

    /**
     * Returns a pseudorandom, uniformly distributed <code>long</code> value between <code>min</code> (inclusive) and
     * <code>max</code> (inclusive).
     *
     * @param min the min value
     * @param max the max value
     * @return the random long value
     */
    public static long getRandomLong(long min, long max) {

        return Math.round(min + getRandom().nextDouble() * (1l + max - min));
    }

    /**
     * Random short value in range. Returns a pseudorandom, uniformly distributed <code>short</code> value between
     * <code>min</code> (inclusive) and <code>max</code> (inclusive).
     *
     * @param min the min
     * @param max the max
     * @return the short
     */
    public static short getRandomShort(short min, short max) {

        return (short) Math.round(min + getRandom().nextDouble() * ((short) 1 + max - min));
    }

    /**
     * Random byte value in range . Returns a pseudorandom, uniformly distributed <code>byte</code> value between
     * <code>min</code> (inclusive) and <code>max</code> (inclusive).
     *
     * @param min the min
     * @param max the max
     * @return the byte
     */
    public static byte getRandomByte(byte min, byte max) {

        return (byte) Math.round(min + getRandom().nextDouble() * ((byte) 1 + max - min));
    }

    /**
     * @return a random char with the range ASCII 33(!) to ASCII 126(~)
     */
    public static char getRandomChar() {

        // from ASCII code 33 to ASCII code 126
        int firstChar = 33; // "!"
        int lastChar = 126; // "~"
        char result = (char) (getRandomInt(firstChar, lastChar + 1));
        return result;
    }

    /**
     * Generate random string.
     *
     * @param len the len
     * @return the string
     */
    public static String generateRandomString(int len) {

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(SEED[getRandom().nextInt(SEED.length)]);
        return sb.toString();
    }


    public static float multiRound(float val, int precision)
    {
        if (! Double.isNaN(val))
        {
            boolean negative = val < 0d;

            BigDecimal db = BigDecimal.valueOf(negative ? -val : val);
            db = db.setScale(precision, BigDecimal.ROUND_HALF_EVEN);

            return negative ? -db.floatValue() : db.floatValue();
        }

        return 0f;
    }
}

