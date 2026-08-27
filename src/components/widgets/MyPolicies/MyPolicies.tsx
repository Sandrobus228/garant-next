"use client";

import React, { useEffect, useState } from "react";

import styles from "./MyPolicies.module.scss";

import MyPoliciesFilters from "@/components/features/MyPoliciesFilters/MyPoliciesFilters";
import Button from "@/components/ui/Button/Button";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { PAGES } from "@/config/pages-url.config";
import { useGetPoliciesByCurrientUser } from "@/hooks/policy/useGetPoliciesByCurrientUser";
import MyPoliciesList from "@/components/entities/MyPoliciesList/MyPoliciesList";
import Text from "@/components/ui/Text/Text";
import Loader from "@/components/ui/Loader/Loader";
import usePolicyFilters from "@/stores/Policy/policyFilters.store";
import { EPolicyTypes, IAllPolicies } from "@/types/policy.types";
import { filterPolicies } from "@/helpers/Policy/filterPolicies";
import { sortByNewestPolicy } from "@/helpers/Policy/sortByNewestPolicy";
import Substrate from "@/components/ui/Substrate/Substrate";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import Link from "next/link";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import useShadow from "@/stores/Shadow/shadow.store";

const MyPolicies = () => {
  const setIsShadowVisible = useShadow((state) => state.setIsShadowVisible);
  const isShadowVisible = useShadow((state) => state.isShadowVisible);

  const { data, isError, isLoading, isSuccess } =
    useGetPoliciesByCurrientUser();

  const policyActivityStatusFilter = usePolicyFilters(
    (state) => state.activityStatus
  );
  const policyTypeFilter = usePolicyFilters((state) => state.policyType);

  const [filteredPolicies, setFilteredPolicies] = useState<
    IAllPolicies | undefined
  >();

  useEffect(() => {
    async function filter() {
      if (data) {
        const filtered: IAllPolicies = await filterPolicies(
          data,
          policyTypeFilter,
          policyActivityStatusFilter
        );

        setFilteredPolicies(filtered);
      }
    }

    filter();
  }, [isLoading, policyActivityStatusFilter, policyTypeFilter]);

  // useEffect(() => {
  //   setIsShadowVisible(true);
  // }, []);

  // function handleCloseBanner() {
  //   setIsShadowVisible(false);
  // }

  return (
    <div>
      {/* <Substrate
        className={`${styles.attentionBanner} ${
          isShadowVisible ? "" : styles.hidden
        }`}
      >
        <button
          onClick={handleCloseBanner}
          className={styles.attentionBannerClose}
        >
          <SvgSelector id={ESvgName.CLOSE} />
        </button>
        <CustomTitle tag="h2">
          Внимание! Сайт в разработке. После оплаты писать в What’sApp по номеру
        </CustomTitle>
        <CustomLink
          href="https://wa.me/79407411000"
          variant="underline"
          target="_blank"
          rel="nofollow noopener"
        >
          +79407411000
        </CustomLink>
      </Substrate>
      <CustomTitle isCentered className={styles.title}>
        Мои полисы
      </CustomTitle> */}

      <MyPoliciesFilters />

      <div className={styles.listWrapper}>
        {filteredPolicies ? (
          filteredPolicies.NS.length !== 0 ||
          filteredPolicies.OSAGO.length !== 0 ? (
            <MyPoliciesList
              filteredPolicies={sortByNewestPolicy(filteredPolicies)}
            />
          ) : (
            <Text className={styles.noDataText}>Здесь пусто</Text>
          )
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
      <Button
        isLink
        href={PAGES.OSAGO_APPLY}
        className={styles.buyPolicyButton}
      >
        Купить полис
      </Button>
    </div>
  );
};

export default MyPolicies;
