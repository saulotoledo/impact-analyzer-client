import { AxiosResponse } from 'axios';
import axios from '../axios';
import Tag from '../interfaces/Tag';

const getTags = async (): Promise<Tag[]> =>
  new Promise(
    (
      resolve: (_value: Tag[] | PromiseLike<Tag[]>) => void,
      reject: (_reason: Error) => void
    ): void => {
      axios
        .get('/tag', { params: {} })
        .then((result: AxiosResponse<Tag[]>) => resolve(result.data), reject);
    }
  );

const deleteTag = async (id: number): Promise<void> =>
  new Promise(
    (
      resolve: (_value: void | PromiseLike<void>) => void,
      reject: (_reason: Error) => void
    ): void => {
      axios
        .delete(`/tag/${id}`)
        .then((_result: AxiosResponse<void>) => resolve(), reject);
    }
  );

const TagsService = {
  getTags,
  deleteTag,
};

export default TagsService;
