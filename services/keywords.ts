import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { KeyWordDto, Paginated, PaginationQuery } from "../lib/interface";
export const useGetKeyWords = ({
  keyword = undefined,
  page = 1,
  limit = 10,
}: PaginationQuery) => {
  let url = `/api/keywords?page=${page}&limit=${limit}`;
  if (keyword) {
    url = url + `&search=${keyword}`;
  }
  console.log("url", url);
  const { data, error, isValidating } = useSWR<Paginated<KeyWordDto>, Error>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      focusThrottleInterval: 5000,
    }
  );
  return { data, error, isValidating };
};
