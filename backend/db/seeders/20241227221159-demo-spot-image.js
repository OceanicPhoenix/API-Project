'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId:1,
        url:'https://a0.muscache.com/im/pictures/b4b0e9f0-473f-41a6-a75c-758d9e146397.jpg?im_w=1200&im_format=avif',
        preview:true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/15ff995c-3d10-4de1-b923-61a0bfedf537.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/21368305/77102db0_original.jpg?im_w=1200&im_format=avif',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/1c7e823c-8590-4f44-9579-a074e9bef752.jpg?im_w=720&im_format=avif',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/b8a2cc4c-a7c4-4425-9782-f8049df1a70c.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/2530122d-8ee2-4ba8-8c1f-2243c82ba92b.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-45675321/original/fd37992e-c168-4c53-99d0-2097d7311c0e.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/50fb8fcb-b4cd-490c-828f-55d7315674fb.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/dd0f3cc7-2933-4b90-912b-478b21dfb034.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/3e0d3e24-32d5-4afa-a562-0160da3774ae.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/1f50db8c-3ee7-4a7e-8116-e9d1844ad387.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/ecc8bbc5-1a05-4d7f-a490-d1336e93e808.jpg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/a9cd9509-2058-4efe-83e8-18e1631c87ee.jpg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1289484213891826918/original/a1477ac1-8f22-42fa-a7d7-76e608617d5f.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1289484213891826918/original/41f8a86e-4726-419e-a64d-14207b151e48.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1289484213891826918/original/01dbaa03-acc4-42a5-8aa0-b3d160d638f4.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/29a41127-c0c5-4af8-bacd-5ce86e95a8c6.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/c2980b65-3095-44e0-b13d-f9e872bcb107.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1233232367865808775/original/c230221f-c029-4512-a21a-7d15a1c69386.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/2adbadf6-e275-4b2d-89cd-f4c16f06d49d.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/5c4efeb9-93aa-4bd0-a644-0713b6791c84.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/97bf9be0-4fe0-42b9-b228-7af54aae3d0d.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/c182998f-96c5-4953-8f2a-5556df5e4085.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/a355c49e-10a2-48a3-b07f-67d4a7ed67b5.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/f85780b4-6a64-47d3-a802-75258dc6a992.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/c02cb5b7-021b-4283-a4e1-6c3c6607b343.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/b548c311-f2f2-465b-a4ac-e78ec3cb6fb0.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzMzIzMjM2Nzg2NTgwODc3NQ%3D%3D/original/15550fa5-b855-4d1e-8452-a546cf31f036.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-630678872143633587/original/908904f0-5b1a-4bda-ab43-9cb53fac2be3.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630678872143633587/original/2c97b4ac-b5ba-4502-8906-8640d5d16f86.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-630678872143633587/original/5634091b-f465-4118-9d93-c2ac70134d40.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630678872143633587/original/567561d9-52e4-4913-9e0e-6009b6696ae0.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630678872143633587/original/571295ed-3950-4908-9e5e-e33afb3356b1.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-630678872143633587/original/b623bd71-e30b-46d4-9f78-531ce09aacd6.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjk1ODY3MzgzODcxMTI1MA%3D%3D/original/e60ce972-c449-4575-8c66-b8442fe6d9fa.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjk1ODY3MzgzODcxMTI1MA%3D%3D/original/77a88d72-2a91-4098-af5d-224b4bbd5dea.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1126958673838711250/original/13d11a5d-88be-4ddf-93bb-0fc3f456424d.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1126958673838711250/original/b55eefb8-2a28-4a40-8dd7-75f3ec98707c.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjk1ODY3MzgzODcxMTI1MA%3D%3D/original/97212dae-e7d5-4df3-a910-500431979af7.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1126958673838711250/original/52c2f304-82f5-4b9c-a4b7-2fc0b1703450.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1126958673838711250/original/68a5c678-5947-4e36-8ceb-1e1c74f3b689.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1126958673838711250/original/43f64c9b-db8c-4c50-829e-99a57ece564c.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1126958673838711250/original/5f4b8b85-6577-48fa-a7c0-aac6a62b13e4.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621079817945988027/original/fc1b95a7-f668-4692-83a1-157396bd300c.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621079817945988027/original/a77de5e4-02aa-4183-97ee-7db31e1ed107.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621079817945988027/original/31419156-d02e-46e9-9b16-5790a736c32b.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621079817945988027/original/641c477d-d86a-4648-b58c-04414b0435ff.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621079817945988027/original/ea4f435d-4ee6-47f7-9a58-903931d30364.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621079817945988027/original/af470e07-8260-4ad2-821b-ee480fb53948.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621079817945988027/original/03887957-eae8-48fb-8118-fef684ec3c34.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008186655883504013/original/5603ae5e-390b-41ff-9e87-3bb717391429.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008186655883504013/original/68879f86-d6ef-4282-b4c6-4478a588cf94.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008186655883504013/original/c302a3f7-03e2-46b6-8fc5-be7fdbec5a75.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/e8574a8c-4249-475e-b680-ad69ba6a464a.jpg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/521aadcb-f30b-4a87-b6c7-257fc4af41f8.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/159df6e9-4bb7-4734-9295-14d48621a079.jpg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/4905c128-267e-4a30-a055-32fc905b2491.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45099958/original/94db5b5a-e329-41e1-8f64-10e2117e9979.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45099958/original/bf11717c-8533-46f0-95a8-cfdcb3726000.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45099958/original/23d0ae5a-0549-4560-bc3b-842b902341de.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45099958/original/ad26fc5e-5cce-4ee7-8f04-7355853f232c.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45099958/original/5636662e-8f16-4e61-8b45-bd0d8e4843b6.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://a0.muscache.com/im/pictures/25940fe5-d595-4f5b-b251-54bf80c42e27.jpg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://a0.muscache.com/im/pictures/0ef03e78-d88d-4ca1-9c86-3ad59f661b40.jpg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://a0.muscache.com/im/pictures/ebf1345f-7456-4695-b659-e92e0bcdd954.jpg?im_w=1200&im_format=avif',
        preview: true
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId:{[Op.in]:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}
    },{});
  }
};