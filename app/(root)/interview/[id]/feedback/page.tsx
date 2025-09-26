import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { cn } from "@/lib/utils";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id!,
  });

  return (
    <section className="section-feedback">
      <h1 className="text-center text-5xl font-semibold">
        Feedback on the Interview - <br />
        <span className="capitalize">{interview.role} Interview</span>
      </h1>

      <div className="flex flex-row justify-around">
        <div className="flex flex-row gap-2">
          <Image src="/star.svg" alt="star" width={22} height={22} />
          <p>
            Overall Impression:{" "}
            <span className="text-primary-200 font-semibold">
              {feedback?.totalScore}
            </span>
            /100
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
          <p>
            {feedback?.createdAt
              ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
              : "N/A"}
          </p>
        </div>
      </div>

      <hr />

      <p>{feedback?.finalAssessment}</p>

      <div className="flex flex-col gap-4">
        <h2>Breakdown of Evaluation:</h2>
        {feedback?.categoryScores.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h3>Strengths:</h3>
        <ul>
          {feedback?.strengths.length ? (
            feedback?.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))
          ) : (
            <p>No strengths</p>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement.length ? (
            feedback?.areasForImprovement.map((area, index) => (
              <li key={index}>{area}</li>
            ))
          ) : (
            <p>No areas for improvement</p>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <h2>Final Assesment</h2>
          <span className="flex flex-row rounded bg-gray-800 p-2">
            <p
              className={cn(
                "font-semibold",
                feedback!.totalScore > 50 ? "text-green-500" : "text-red-500",
              )}
            >
              {feedback?.totalScore}
            </p>
            /100
          </span>
        </div>
        <p>{feedback?.finalAssessment}</p>
      </div>
      <div></div>

      <div className="buttons">
        <Button asChild className="btn-secondary flex-1">
          <Link href="/">Back to Dashboard</Link>
        </Button>
        <Button asChild className="btn-primary flex-1">
          <Link href={`/interview/${id}`}>Retake Interview</Link>
        </Button>
      </div>
    </section>
  );
};

export default Page;
