import { AxiosError, AxiosResponse } from 'axios';

import axios from '../axios';
import Table from '../interfaces/Table';
import { RejectType, ResolveType } from '../react-app-env';

const getTables = async (): Promise<Table[]> =>
  new Promise((resolve: ResolveType<Table[]>, reject: RejectType): void => {
    axios
      .get('/table/', { params: {} })
      .then((result: AxiosResponse<Table[]>) => resolve(result.data), reject);
  });

const getTable = async (id: string): Promise<Table> =>
  new Promise((resolve: ResolveType<Table>, reject: RejectType): void => {
    axios.get(`/table/${id}/`).then(
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

const TablesService = {
  getTable,
  getTables,
};

export default TablesService;
