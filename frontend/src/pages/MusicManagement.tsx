import React from "react";
import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    AddButton,
    ContentArea,
    StatsBar,
} from "./MusicManagement.style";
import SearchBar from "../components/SearchBar";
import SongList from "../components/SongList";

const MusicManagement = () => {
    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <SearchBar />
                </HeaderLeft>
                <HeaderRight>
                    <AddButton>Add New Song</AddButton>
                </HeaderRight>
            </Header>
            <ContentArea>
                <StatsBar>
                    <div>Total Songs: 100</div>
                    <div>Playing Now: Song Title</div>
                </StatsBar>

                <SongList />
            </ContentArea>
        </Container>
    );
};

export default MusicManagement;
