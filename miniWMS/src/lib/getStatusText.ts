export const getStatusText = (status: string) => {
    switch (status) {
        case "active":
            return "Hoạt động";
        case "inactive":
            return "Tạm dừng";
        case "maintenance":
            return "Bảo trì";
        default:
            return status;
    }
};