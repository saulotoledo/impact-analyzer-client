import axios, { AxiosError, AxiosResponse } from 'axios';

import axiosInstance from '../axios';
import Table from '../interfaces/Table';
import { RejectType, ResolveType } from '../react-app-env';

const getTables = async (): Promise<Table[]> =>
  new Promise((resolve: ResolveType<Table[]>, reject: RejectType): void => {
    axiosInstance
      .get('/table/', { params: {} })
      .then((result: AxiosResponse<Table[]>) => resolve(result.data), reject);
  });

const getTable = async (id: string): Promise<Table> =>
  new Promise((resolve: ResolveType<Table>, reject: RejectType): void => {
    axiosInstance.get(`/table/${id}/`).then(
      (result: AxiosResponse<Table>) => resolve(result.data),
      (error: AxiosError<{ code: number }>) => {
        let errorMessage = error.message;
        if (error.response && error.response.status === 404) {
          errorMessage = 'The informed table was not found';
        }
        reject(new Error(errorMessage));
      }
    );
  });

const uploadTable = async (acceptedFiles: File[]): Promise<void> =>
  new Promise((resolve: ResolveType<void>, reject: RejectType): void => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    axios
      .create({
        baseURL: axiosInstance.defaults.baseURL,
      })
      .post('/table/upload/', formData)
      .then((result: AxiosResponse<void>) => resolve(result.data), reject);
  });

const TablesService = {
  getTable,
  getTables,
  uploadTable,
};

export default TablesService;
