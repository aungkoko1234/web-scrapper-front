import { type } from "os";

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

export type ActionInterface = {
  readonly type: string;
  readonly payload?: unknown;
};

type UserProfile = {
  id: string;
  userName: string;
  email: string;
};
export interface SignInResponseDto {
  accessToken: string;
  profile: UserProfile;
}

type ResponeMeta = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};
export interface Paginated<T> {
  items: T[];
  meta: ResponeMeta;
}

export interface PaginationQuery {
  page?: number;
  total?: number;
  limit: number;
  keyword?: string;
}

export interface KeyWordDto {
  id: string;
  name: string;
  createdBy: string;
  adsWordCount: number;
  linkCount: number;
  searchResultCount: number;
  htmlSource: string;
  created: string;
}

export type TableHeader = {
  title: string;
  name: string;
  type: "text" | "block" | "action";
  align: "right" | "left" | "center" | undefined;
  // eslint-disable-next-line no-unused-vars
  action?: (data: unknown) => void;
};
