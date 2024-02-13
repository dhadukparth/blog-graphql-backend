const ContactSchema = `
    type Contact {
        firstname: String
        lastname: String
        email: String
        phone: String
        subject: String
        message: String
    }

    type allResponse {
        status: Int,
        message: String
        data: [Contact]
    }

    type Query {
        getContact: allResponse
    }
`;

module.exports = ContactSchema;