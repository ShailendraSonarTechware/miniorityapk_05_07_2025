import { useLocalSearchParams } from "expo-router";
import ServiceDetail from "../components/ServiceDetail";

export default function ServicePage() {
  const { seriveslug } = useLocalSearchParams(); // <-- grabs slug from URL

  // console.log("ye hai slug :", seriveslug   )
  return <ServiceDetail slug={seriveslug  as string} />;
  // return <ServiceDetail />;
}
