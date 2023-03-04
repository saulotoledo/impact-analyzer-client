import { AxiosResponse } from 'axios';
import axios from '../axios';
import Tag from '../interfaces/Tag';

const getTags = async (): Promise<Tag[]> =>
  new Promise(
    (
      // eslint-disable-next-line no-unused-vars
      resolve: (value: Tag[] | PromiseLike<Tag[]>) => void,
      // eslint-disable-next-line no-unused-vars
      reject: (reason: Error) => void
    ): void => {
      axios
        .get('/tag', { params: {} })
        .then((result: AxiosResponse<Tag[]>) => resolve(result.data), reject);
    }
  );

const TagsService = {
  getTags,
};

export default TagsService;
