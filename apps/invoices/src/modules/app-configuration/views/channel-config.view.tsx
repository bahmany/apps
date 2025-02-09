import { Box, ChevronRightIcon, Text, Button } from "@saleor/macaw-ui/next";
import { AppSection } from "../../ui/AppSection";
import { useRouter } from "next/router";
import { ConnectedAddressForm } from "../ui/address-form";
import { trpcClient } from "../../trpc/trpc-client";
import { useDashboardNotification } from "@saleor/apps-shared";

export const ChannelConfigView = () => {
  const {
    push,
    query: { channel },
  } = useRouter();

  const { mutateAsync } = trpcClient.appConfiguration.removeChannelOverride.useMutation();
  const { notifySuccess } = useDashboardNotification();

  if (!channel) {
    return null;
  }

  return (
    <Box>
      <Box __marginBottom={"100px"}>
        <Box marginBottom={8} display={"flex"} alignItems={"center"}>
          <Text color={"textNeutralSubdued"}>Configuration</Text>
          <ChevronRightIcon color={"textNeutralSubdued"} />
          <Text color={"textNeutralSubdued"}>Edit channel</Text>
          <ChevronRightIcon color={"textNeutralSubdued"} />
          <Text>{channel}</Text>
        </Box>
      </Box>
      <AppSection
        includePadding={true}
        heading={"Shop address per channel"}
        mainContent={<ConnectedAddressForm channelSlug={channel as string} />}
        sideContent={
          <Box>
            <Text marginBottom={8} as={"p"}>
              Set custom billing address for <Text variant={"bodyStrong"}>{channel}</Text> channel.
            </Text>
            <Button
              variant={"secondary"}
              onClick={() => {
                mutateAsync({ channelSlug: channel as string }).then(() => {
                  notifySuccess("Success", "Custom address configuration removed");
                  push("/configuration");
                });
              }}
            >
              Remove and set to default
            </Button>
          </Box>
        }
      />
    </Box>
  );
};
