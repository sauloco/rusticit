import { BookerEmbed } from "@calcom/atoms";

type BookerProps = { eventTypeSlug: string; calUsername: string; /* other props */ };
const eventSlug = '20min' as const;
const calUsername = 'rusticit' as const;

export default function Booker( props : BookerProps ) {
    return (
        <>
            <BookerEmbed
                // Use the parsed username and event slug from calLink
                eventSlug={eventSlug}
                // layout can be of three types: COLUMN_VIEW, MONTH_VIEW or WEEK_VIEW,
                // you can choose whichever you prefer
                view="WEEK_VIEW"
                username={calUsername}
                customClassNames={{
                    bookerContainer: "border-subtle border inset-0",
                }}
                onCreateBookingSuccess={() => {
                    console.log("booking created successfully");
                }}
            />
        </>
    );
};