"use client";

import { useSearchParams } from "next/navigation"; // Hook để lấy tham số từ URL
import { useEffect, useState } from "react";

const Callback = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get("code") || ""; // Lấy mã xác thực từ URL
    const state = searchParams.get("state") || ""; // Lấy trạng thái từ URL

    const [codeVerifier, setCodeVerifier] = useState("");
    const [responseData, setResponse] = useState<any>(null);
    const clientId = "14495804986765760978"; // ID client của bạn
    const redirectUri = "https://syncible-cert-admin.vercel.app/oauth/callback"; // URL chuyển hướng

    const handleGetAccessToken = async () => {
        try {
            const storedState = localStorage.getItem("state");
            if (!storedState || storedState !== state) {
                throw new Error("Invalid state parameter"); // Kiểm tra tính hợp lệ của trạng thái
            }

            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    grant_type: "authorization_code", // Kiểu cấp phép
                    code: code, // Mã xác thực
                    redirect_uri: redirectUri, // URL chuyển hướng
                    code_verifier: localStorage.getItem("codeVerifier") || "", // Mã xác minh
                    client_id: clientId, // ID client
                }),
            };

            const res = await fetch("https://api.basalwallet.com/api/v1/oauth/token", options);
            const data = await res.json();
            setResponse(data); // Lưu dữ liệu phản hồi
            // Lưu access token vào localStorage hoặc xử lý theo cách bạn muốn
            if (data.success) {
                localStorage.setItem("access_token", data.data.access_token);
                localStorage.setItem("refresh_token", data.data.refresh_token);
            }
        } catch (error) {
            alert(error); // Hiển thị thông báo lỗi
        }
    };

    useEffect(() => {
        setCodeVerifier(localStorage.getItem("codeVerifier") || ""); // Lấy mã xác minh từ localStorage
        handleGetAccessToken(); // Gọi hàm để lấy access token
    }, []);

    return (
        <div className="m-10 w-2/3 mx-auto space-y-4">
            <h1 className="text-lg font-bold">Callback Response</h1>
            <p className="break-all">Code Verifier: {codeVerifier}</p>
            <p className="break-all">Code Authorization: {code}</p>
            <p className="break-all">Access Token: {responseData?.data?.access_token || ""}</p>
            <p className="break-all">Refresh Token: {responseData?.data?.refresh_token || ""}</p>
            <div className="pt-4">
                <a href="/oauth">Retry</a>
            </div>
        </div>
    );
};

export default Callback;
