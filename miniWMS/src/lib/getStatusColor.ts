export const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-800 border-green-200";
        case "inactive":
            return "bg-gray-100 text-gray-800 border-gray-200";
        case "maintenance":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};