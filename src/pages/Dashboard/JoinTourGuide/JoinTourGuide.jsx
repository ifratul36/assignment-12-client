import { useState } from "react";

const JoinTourGuide = () => {
    const [formData, setFormData] = useState({
        title: "",
        reason: "",
        cvLink: ""
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessModal(true);
    };

    return (
        <div>
            <h2>Join as a Tour Guide</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Application Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Why do you want to be a Tour Guide?
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    CV Link:
                    <input
                        type="url"
                        name="cvLink"
                        value={formData.cvLink}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>

            {showSuccessModal && (
                <div className="modal">
                    <h3>Application Successful</h3>
                    <p>Your application to join as a tour guide has been submitted successfully.</p>
                    <button onClick={() => setShowSuccessModal(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default JoinTourGuide;