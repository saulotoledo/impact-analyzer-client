import { AxiosError, AxiosResponse } from 'axios';

import axios from '../axios';
import Tag from '../interfaces/Tag';
import { RejectType, ResolveType } from '../react-app-env';

const getTags = async (): Promise<Tag[]> =>
  new Promise((resolve: ResolveType<Tag[]>, reject: RejectType): void => {
    axios
      .get('/tag/', { params: {} })
      .then((result: AxiosResponse<Tag[]>) => resolve(result.data), reject);
  });

const deleteTag = async (id: number): Promise<void> =>
  new Promise((resolve: ResolveType<void>, reject: RejectType): void => {
    axios
      .delete(`/tag/${id}/`)
      .then((_result: AxiosResponse<void>) => resolve(), reject);
  });

const getTag = async (id: string): Promise<Tag> =>
  new Promise((resolve: ResolveType<Tag>, reject: RejectType): void => {
    axios.get(`/tag/${id}/`).then(
      (result: AxiosResponse<Tag>) => resolve(result.data),
      (error: AxiosError<{ code: number }>) => {
        let errorMessage = error.message;
        if (error.response && error.response.status === 404) {
          errorMessage = 'The informed tag was not found';
        }
        reject(new Error(errorMessage));
      }
    );
  });

const updateTag = async (data: Tag): Promise<Tag> =>
  new Promise((resolve: ResolveType<Tag>, reject: RejectType): void => {
    axios
      .put(`/tag/${data.id}/`, data)
      .then((result: AxiosResponse<Tag>) => resolve(result.data), reject);
  });

const TagsService = {
  getTag,
  getTags,
  deleteTag,
  updateTag,
};

export default TagsService;
