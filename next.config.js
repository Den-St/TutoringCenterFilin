/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    basePath: '/TutoringCenterFilin',
    images: { unoptimized: true } ,
    env:{
        'FIREBASE_API_KEY':'AIzaSyCzvNwE341il6aEmEzw2ySE6B50VyD2Lko',
        'FIREBASE_AUTH_DOMAIN':'tutoringcenterfilin.firebaseapp.com',
        'FIREBASE_PROJECT_ID':'tutoringcenterfilin',
        'FIREBASE_STORAGE_BUCKET':'tutoringcenterfilin.appspot.com',
        'FIREBASE_MESSAGING_SENDER_ID':'751548748819',
        'FIREBASE_APP_ID':'1:751548748819:web:ba838f601bd58242cf1be6',
        'FIREBASE_MEASUREMENT_ID':'G-M4QWBFVSH5',
        'LIQPAY_PUBLIC_KEY':'sandbox_i80004363846',
        'LIQPAY_PRIVATE_KEY':'sandbox_Wpi94NBsugfTYiRdTFJbkvlzhXPVMK35WBb5Ku9w',
        'AFTER_PAYMENT_PAGE':'https://den-st.github.io/TutoringCenterFilin/after-payment',
        'AFTER_PAYMENT_PAGE_LOCAL':'http://localhost:3000/TutoringCenterFilin/after-payment',
    }
}

module.exports = nextConfig
