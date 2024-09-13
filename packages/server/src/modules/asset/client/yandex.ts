import EasyYandexS3 from 'easy-yandex-s3'

export const s3 = new EasyYandexS3({
    auth: {
        accessKeyId: 'YCAJEQ9dTuvHOQUyRQZUAVi9v',
        secretAccessKey: 'YCOCfEMDscU_yAVCU92v3Szyw171OUCI9WfpytGI',
    },
    Bucket: 'itbooks-bucket',
    debug: true,
});
