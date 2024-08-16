import Card, { CardGrid } from "@/components/card";
import { getJobs } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import Button from "@/components/button";
import Link from "next/link";
import Toast from "@/components/toast";

export default async function HomePage() {
  const jobs = await getJobs();

  return (
    <>
      <Toast />
      <div className="flex flex-col gap-6 px-4">
        <div>
          <h3 className="pb-2 text-lg text-black">Job posts</h3>
          <CardGrid>
            {jobs?.map(({ id, title, location, first_published_at }) => (
              <Card
                key={id}
                title={title}
                data={[
                  { label: "Location", value: location.name },
                  ...(first_published_at
                    ? [
                        {
                          label: "Published",
                          value: formatDistanceToNow(first_published_at, {
                            addSuffix: true,
                          }),
                        },
                      ]
                    : []),
                ]}
                footer={() => (
                  <Button as={Link} href={`/apply/${id}`}>
                    Apply
                  </Button>
                )}
              />
            ))}
          </CardGrid>
        </div>
      </div>
    </>
  );
}
