const About = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">About Us</h2>

                <p className="text-gray-700 mb-4">
                    Welcome to our platform! We are a dedicated team committed to providing a seamless
                    experience for task management. Whether you are a developer, corporate professional,
                    banker, entrepreneur, or student, our platform is designed to cater to your unique needs.
                </p>

                <p className="text-gray-700 mb-4">
                    Our mission is to enhance productivity and collaboration in various domains. With our
                    intuitive task management system and real-time collaboration features, you can organize
                    your work efficiently and stay on top of your projects.
                </p>

                <p className="text-gray-700">
                    Join us on this journey of productivity and efficiency. If you have any questions or
                    feedback, feel free to reach out to us through our{' '}
                    <a href="/contact" className="text-blue-500 hover:underline">
                        Contact Page
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default About;