import { useAuth } from "../context/AuthContext";
import { Product, Order } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE || "";


export const useApi = () => {
    const { token } = useAuth();

    const getAuthHeaders = () => ({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    });

    const fetchProducts = async () => {
        const res = await fetch(`${API_BASE}/products`, {
            headers: getAuthHeaders(),
        });

        const data: Product[] = await res.json();
        return data;
    };

    const createProduct = async (product: any) => {
        console.log("Produto sendo salvo: ", product)
        const res = await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(product),
        });

        const respondeBody = await res.json();
        console.log("Resposta do backend: ", respondeBody);

        if(!res.ok) {
            throw new Error(respondeBody?.message || "Erro ao criar produto")
        }

        return respondeBody;
    };

    const uploadImage = async (file: File, bucket: string): Promise<string> => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("bucket", bucket);

        const res = await fetch(`${API_BASE}/products/upload-image`, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        });

        if(!res.ok){
            throw new Error("Erro ao enviar imagem!");
        }

        const {imageUrl} = await res.json();
        return imageUrl;
    }

    const fetchOrders = async () => {
        const res = await fetch(`${API_BASE}/orders/tenant`, {
            headers: getAuthHeaders(),
        });

        const data: Order[] = await res.json();
        return data;
    };

    const changeOrderStatus = async (orderId: string, newStatus: string) => {
        const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({status: newStatus}),
        });

        if(!res.ok){
            throw new Error("Erro ao atualizar o status do pedido!");
        }

        return res.json();
    }

    const updateUser = async (data: any) => {
        const res = await fetch(`${API_BASE}/auth/update`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Erro ao atualizar o usuário!");
        }

        return res.json();
    };

    const fetchCompanyData = async () => {
        const res = await fetch(`${API_BASE}/companies/company`, {
            headers: getAuthHeaders(),
        });

        const data = await res.json();
        return data;
    };

    const fetchCompanyUsers = async () => {
        const res = await fetch(`${API_BASE}/companies/company/users`, {
            headers: getAuthHeaders(),
        });

        const data = await res.json();
        return data;
    };

    return { fetchProducts, createProduct, uploadImage, fetchOrders, changeOrderStatus, updateUser, fetchCompanyData, fetchCompanyUsers };
}

