import {
    Card,
    CardHeader,
    SongInfo,
    Title,
    Meta,
    ActionButtons,
    CardBottom,
    Detail,
    Label,
    Value,
    GenreBadge,
} from "@styles/SongCard.style";

const SongCard = () => {
    return (
        <Card
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-out-cubic"
            className="song-card-container"
        >
            <CardHeader>
                <SongInfo>
                    <Title>All glory to Christ</Title>
                    <Meta>Jesus christ • Gospel</Meta>
                </SongInfo>
                <ActionButtons>
                    <button
                        className="edit"
                        onClick={() => {}}
                        title="Edit song"
                    >
                        ✏️
                    </button>
                    <button
                        className="delete"
                        onClick={() => {}}
                        title="Delete song"
                    >
                        🗑️
                    </button>
                </ActionButtons>
            </CardHeader>

            <CardBottom>
                <Detail>
                    <Label>Year</Label>
                    <Value>{1999}</Value>
                </Detail>
                <Detail>
                    <Label>Duration</Label>
                    <Value>Infinity</Value>
                </Detail>
                <GenreBadge>from God</GenreBadge>
            </CardBottom>
        </Card>
    );
};

export default SongCard;
