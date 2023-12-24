const Contact = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border rounded-md"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="w-full p-2 border rounded-md"
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;