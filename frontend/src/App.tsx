import {
    AppContainer,
    Header,
    Title,
    Subtitle,
    SubContainer,
    Fun,
} from "./App.style";
import MusicManagement from "./pages/MusicManagement";

const App = () => {
    return (
        <AppContainer>
            <Header>
                <Title>Addis Software Internship Test</Title>
                <SubContainer>
                    <Subtitle>by</Subtitle>
                    <Subtitle>
                        <Fun>Yonatan</Fun>
                    </Subtitle>
                    <Subtitle>Afewerk Teshome</Subtitle>
                </SubContainer>
            </Header>
            <MusicManagement />
        </AppContainer>
    );
};

export default App;
