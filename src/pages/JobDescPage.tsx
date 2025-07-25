import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import JobDesc from "../Components/JobDesc/JobDesc";
import RecommendedJob from "../Components/JobDesc/RecommendedJob";

const JobDescPage = ()=>{
    return <div className="min-h-[90vh] bg-mine-shaft-950 font-'poppins' p-4">
        <Link className="my-4 inline-block" to="/find-jobs">
        <Button color="brightSun.4" leftSection={<IconArrowLeft size={20}/>} variant="light" fullWidth>Back</Button>
        </Link>
        <div className="flex gap-5 justify-around">
            <JobDesc/>
            <RecommendedJob/>
        </div>
  </div>
}

export default JobDescPage;