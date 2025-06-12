import Sidebar from '../components/Sidebar';
import '../styles/Home.css';
import veggiesImage from '../assets/veggies.jpg';

export default function Home() {
    return (
        <div className="home-layout">
            <main className="home-main">
                <div className="home-content">
                    <h1>냠냠하고, 굶지 말고, 잘 먹자!</h1>
                    <p className="home-p">식단도, 단식도, 냠잇이면 OK! 😎</p>
                    <button className="go-button">냠잇하러 가기</button>
                </div>

                <div className="home-image">
                    <img src={veggiesImage} alt="채소 이미지" />
                </div>
            </main>
        </div>
    );
}
