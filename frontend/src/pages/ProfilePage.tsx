/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MusicDashboard from "@/components/Dashboard";

const Container = styled.div`
    max-width: 72rem; /* max-w-6xl */
    margin: 0 auto;
    padding: 0 1.5rem; /* p-6 */
    position: relative;
`;

const BannerWrapper = styled.div`
    position: relative;
    border: 1px dashed #9ca3af;
    border-radius: 0.5rem;
    margin-bottom: 4rem;
    /* remove overflow hidden here */
`;

const BannerImageWrapper = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 0.5rem;
    overflow: hidden; /* only on this wrapper */
`;

const BannerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Avatar = styled.img`
    position: absolute;
    left: 1.5rem; /* left side with some padding */
    bottom: -4rem; /* half of avatar height below the banner bottom */
    width: 8rem; /* w-32 */
    height: 8rem; /* h-32 */
    border-radius: 50%;
    border: 1px dashed #6b7280; /* gray-500 */
    object-fit: cover;
    background: white;
`;

const InfoSection = styled.div`
    padding: 0 1.5rem 1.5rem 1.5rem; /* px-6 pb-6 */
    margin-top: 0;
`;

const Name = styled.h1`
    font-weight: 700;
    font-size: 1.5rem; /* text-2xl */
    color: #111827; /* gray-900 */
    margin-top: 0; /* remove margin top so no double spacing */
`;

const Handle = styled.p`
    color: #6b7280; /* gray-500 */
    margin-top: 0.25rem;
`;

const Email = styled.p`
    color: #4b5563; /* gray-600 */
    margin-top: 0.5rem;
    font-size: 0.875rem; /* text-sm */
`;

const ProfilePage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { name, email }: { name?: string; email?: string } = user || {};

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    const avatarUrl = "https://i.pravatar.cc/150?img=1";
    const bannerUrl = "https://placehold.co/1200x200";
    const handle = `@${name}`;

    return (
        <Container>
            <BannerWrapper>
                <BannerImageWrapper>
                    <BannerImage src={bannerUrl} alt="Banner" />
                </BannerImageWrapper>
                <Avatar src={avatarUrl} alt={`${name} avatar`} />
            </BannerWrapper>

            <InfoSection>
                <Name>{name}</Name>
                <Handle>{handle}</Handle>
                <Email>{email}</Email>
            </InfoSection>

            <div>
                <MusicDashboard />
            </div>
        </Container>
    );
};

export default ProfilePage;
