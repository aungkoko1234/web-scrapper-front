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

export interface Paginated<T> {
  data: T[];
  currentPage: number;
  limit: number;
  total: number;
}

export interface PaginationQuery {
  page?: number;
  total?: number;
  limit: number;
  keyword?: string;
}

export type TableHeader = {
  title: string;
  name: string;
  type: "text" | "block" | "action";
  align: "right" | "left" | "center" | undefined;
  // eslint-disable-next-line no-unused-vars
  action?: (data: unknown) => void;
};
