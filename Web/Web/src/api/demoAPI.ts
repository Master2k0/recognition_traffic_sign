import axiosClient from './axiosClient';

const endpointPredict = '/predict';
// const demoAPI = {
//   getApi: async (id: string, param: any) =>
//     await axiosClient.get(`${endpointDemo}/${id}`, { params: param }),
// };

const PredictApi = {
  postPredict: async (form: FormData) =>
    await axiosClient.post(endpointPredict, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  test: async () => await axiosClient.get('/test'),
};

export default PredictApi;
