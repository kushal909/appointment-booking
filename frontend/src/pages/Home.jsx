import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            ❤️ Better Healthcare, Better Life
          </span>

          <h1>
            Healthcare made
            <br />
            <span>simple and accessible.</span>
          </h1>

          <p>
            Connect with trusted healthcare professionals,
            manage your appointments, and take control of
            your health journey.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              Get Started
            </Link>

            <Link to="/login">
              Sign In
            </Link>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features">

        <div className="features-heading">

          <h2>
            Everything you need
          </h2>

          <p>
            Healthcare management made simple.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              👨‍⚕️
            </div>

            <h3>
              Find Doctors
            </h3>

            <p>
              Find qualified healthcare
              professionals easily.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📅
            </div>

            <h3>
              Book Appointments
            </h3>

            <p>
              Schedule appointments at
              your convenience.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              💊
            </div>

            <h3>
              Manage Healthcare
            </h3>

            <p>
              Keep your healthcare
              information organized.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <h3>
              Secure & Private
            </h3>

            <p>
              Your information is handled
              with security in mind.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta">

        <div className="cta-box">

          <h2>
            Ready to take control of your health?
          </h2>

          <p>
            Create your account and start managing
            your healthcare journey today.
          </p>

          <Link
            to="/register"
            className="cta-button"
          >
            Create Account
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;