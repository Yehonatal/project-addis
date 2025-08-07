/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { RootState } from "@/store/store";
import { Music, Mic2, CalendarClock } from "lucide-react";
import CountUp from "react-countup";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSongsRequest } from "@/store/slices/songsSlice";

const DashboardContainer = styled.div`
    max-width: 72rem;
    margin: 0 auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
`;

const StatCard = styled.div`
    padding: 1.25rem;
    border: 1px dashed #d1d5db;
    border-radius: 0.5rem;
    background: #f9fafb;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const StatLabel = styled.p`
    color: #6b7280;
    font-size: 0.875rem;
`;

const StatValue = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ChartWrapper = styled.div`
    margin-top: 1.5rem;
    padding: 1.25rem;
    width: 100%;
    height: 300px;
    background: #ffffff;
    border-radius: 0.5rem;
    border: 1px dashed #d1d5db;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

const MusicDashboard = () => {
    const dispatch = useDispatch();
    const { songs, pagination, isLoading, error, searchQuery } = useSelector(
        (state: RootState) => state.songs
    );

    useEffect(() => {
        dispatch(fetchSongsRequest());
    }, [dispatch]);

    console.log("Songs data:", songs);

    const totalSongs = songs?.length || 0;

    const topArtist =
        songs?.reduce((acc: Record<string, number>, song) => {
            acc[song.artist] = (acc[song.artist] || 0) + 1;
            return acc;
        }, {}) || {};

    const sortedArtists = Object.entries(topArtist).sort((a, b) => b[1] - a[1]);
    const topArtistName = sortedArtists[0]?.[0] || "N/A";

    const latestSong = songs?.[songs.length - 1];

    const genreCounts =
        songs?.reduce(
            (acc, song) => {
                acc[song.genre] = (acc[song.genre] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        ) || {};

    const genreData = Object.entries(genreCounts).map(([genre, count]) => ({
        name: genre,
        value: count,
    }));

    return (
        <DashboardContainer>
            <SectionTitle>🎧 Music Overview</SectionTitle>

            <StatGrid>
                <StatCard>
                    <StatLabel>Total Songs</StatLabel>
                    <StatValue>
                        <Music size={20} />
                        <CountUp end={totalSongs} duration={1.2} />
                    </StatValue>
                </StatCard>

                <StatCard>
                    <StatLabel>Top Artist</StatLabel>
                    <StatValue>
                        <Mic2 size={20} />
                        {topArtistName}
                    </StatValue>
                </StatCard>

                <StatCard>
                    <StatLabel>Latest Song</StatLabel>
                    <StatValue>
                        <CalendarClock size={20} />
                        {latestSong?.title || "N/A"}
                    </StatValue>
                </StatCard>
            </StatGrid>

            <ChartWrapper>
                <SectionTitle>🎨 Genre Distribution</SectionTitle>
                {genreData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={genreData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name }) => name}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {genreData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No genre data available</p>
                )}
            </ChartWrapper>
        </DashboardContainer>
    );
};

export default MusicDashboard;
