import axios, { AxiosError, AxiosResponse } from 'axios';

import axiosInstance from '../axios';
import Table from '../interfaces/Table';
import TableEntry from '../interfaces/TableEntry';
import { RejectType, ResolveType } from '../react-app-env';

const getTables = async (): Promise<Table[]> =>
  new Promise((resolve: ResolveType<Table[]>, reject: RejectType): void => {
    axiosInstance
      .get('/table/', { params: {} })
      .then((result: AxiosResponse<Table[]>) => resolve(result.data), reject);
  });

const getTableEntries = async (tableId: number): Promise<TableEntry[][]> =>
  new Promise(
    (resolve: ResolveType<TableEntry[][]>, reject: RejectType): void => {
      axiosInstance
        .get(`/table/${tableId}/entry/`, { params: {} })
        .then(
          (result: AxiosResponse<TableEntry[][]>) => resolve(result.data),
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

const updateTableEntry = async (
  tableId: number,
  tableEntry: TableEntry
): Promise<TableEntry> =>
  new Promise((resolve: ResolveType<TableEntry>, reject: RejectType): void => {
    axiosInstance
      .put(`/table/${tableId}/entry/${tableEntry.id}/`, tableEntry)
      .then(
        (result: AxiosResponse<TableEntry>) => resolve(result.data),
        (error: AxiosError<{ code: number }>) => {
          let errorMessage = error.message;
          if (error.response && error.response.status === 404) {
            errorMessage = 'The informed table was not found';
          }
          reject(new Error(errorMessage));
        }
      );
  });

const TablesService = {
  getTable,
  getTables,
  getTableEntries,
  uploadTable,
  updateTableEntry,
};

export default TablesService;
