import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../components/reusable/JobCard";
import Loading from "../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../features/job/jobApi";

const AppliedJob = () => {
    const {
        user: { email },
    } = useSelector((state) => state.auth);
    const { data, isLoading } = useGetAppliedJobsQuery(email);
    // console.log(data.data);
    const appliedJobs = data?.data || {};
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="my-10">
            <h1 className="text-3xl text-center my-4 text-primary">
                Applied Jobs
            </h1>
            <div className=" grid grid-cols-2">
                {appliedJobs.map((job) => (
                    <JobCard key={job._id} jobData={job} />
                ))}
            </div>
        </div>
    );
};

export default AppliedJob;
