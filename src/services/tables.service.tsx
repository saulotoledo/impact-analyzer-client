import axios, { AxiosError, AxiosResponse } from 'axios';

import axiosInstance from '../axios';
import Table from '../interfaces/Table';
import TableField from '../interfaces/TableField';
import { RejectType, ResolveType } from '../react-app-env';

const getTables = async (): Promise<Table[]> =>
  new Promise((resolve: ResolveType<Table[]>, reject: RejectType): void => {
    axiosInstance
      .get('/table/', { params: {} })
      .then((result: AxiosResponse<Table[]>) => resolve(result.data), reject);
  });

const getTableEntries = async (tableId: number): Promise<TableField[][]> =>
  new Promise(
    (resolve: ResolveType<TableField[][]>, reject: RejectType): void => {
      axiosInstance
        .get(`/table/${tableId}/entry/`, { params: {} })
        .then(
          (result: AxiosResponse<TableField[][]>) => resolve(result.data),
          reject
        );
    }
  );

const getTable = async (id: number): Promise<Table> =>
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
  getTableEntries,
  uploadTable,
};

export default TablesService;
