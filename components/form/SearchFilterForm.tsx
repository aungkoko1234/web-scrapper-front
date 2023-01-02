import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import SearchInputComponent from "../SearchInputComponent";

type FormValues = {
  keyword: string;
};

interface Props {
  initialValues: FormValues;
  placeholder?: string;
}

const SearchFilterForm: React.FC<Props> = ({
  initialValues,
  placeholder = "",
}) => {
  const router = useRouter();
  const query = router.query;

  const handleSubmit = (values: FormValues) => {
    const qParams: { keyword?: string } = {};
    if (values.keyword) {
      qParams.keyword = values.keyword;
    } else {
      delete query.keyword;
    }
    const urlSearchParams = { ...query, ...qParams } as Record<string, string>;
    void router.replace({
      pathname: location.pathname,
      search: new URLSearchParams(urlSearchParams).toString(),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("values", values);
        handleSubmit(values);
      }}
      onReset={() => {
        delete query.keyWord;
        const urlSearchParams = { ...query } as unknown as Record<
          string,
          string
        >;
        void router.replace({
          pathname: location.pathname,
          search: new URLSearchParams(urlSearchParams).toString(),
        });
      }}
    >
      {() => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <SearchInputComponent
              label="Search"
              name="keyword"
              type="text"
              placeholder={placeholder}
            />
            <div style={{ marginLeft: "20px" }}>
              <Button type="reset">Reset</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchFilterForm;
