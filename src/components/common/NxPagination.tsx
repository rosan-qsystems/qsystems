import { Grid, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { receivePageCountInformation } from "../../utils/helpers/page.helper";
export const NxPagination = (props: any) => {
  const {
    totalDataCount,
    totalPageDataCount,
    defaultValue,
    label,
    ...paginationProps // ✅ all remaining props meant for <Pagination />
  } = props;

  const [pageTotalInformation, setPageTotalInformation] = useState({
    to: 0,
    from: 0,
    totalCount: 0,
  });

  useEffect(() => {
    handlePageChange();
  }, [totalDataCount, totalPageDataCount, defaultValue]);

  const handlePageChange = () => {
    const { from, to }: any = receivePageCountInformation(
      defaultValue > 0 ? defaultValue : 0,
      totalPageDataCount > 0 ? totalPageDataCount : 20,
      totalDataCount ?? 0,
    );

    setPageTotalInformation({
      to,
      from,
      totalCount: totalDataCount ?? 0,
    });
  };

  return (
    <Grid className="w-full flex" align="center" justify="center">
      <Grid.Col
        className="flex items-center"
        span={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
      >
        <Pagination
          color="secondary"
          boundaries={1}
          siblings={1}
          size="sm"
          {...paginationProps} // ✅ Only valid props passed
        />
      </Grid.Col>
      <Grid.Col span={6} className="flex justify-end">
        {label && (
          <div className="font-normal text-sm absolute right-none mr-sm">
            {label ?? "--"} per page{" "}
            <span className="font-medium">
              {pageTotalInformation?.from} - {pageTotalInformation?.to} of{" "}
              {pageTotalInformation?.totalCount}
            </span>
          </div>
        )}
      </Grid.Col>
    </Grid>
  );
};
