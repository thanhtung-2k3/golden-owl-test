import { studentScore, studentScoreResponse } from "../components/types/studentScoreData.response";
const API_GET_STUDENT_SCORE_ENDPOINT = "http://localhost:3000";

async function getStudentScoreByID(id: string) {
    let responseData: any;
    try {
        const response = await fetch(`${API_GET_STUDENT_SCORE_ENDPOINT}/api/student/${id}`, {  
            method: 'GET',
        });
        responseData = await response.json();
        if (!response.ok) {
            const errorText = await responseData.error;
            // console.error(`HTTP error fetching conference! Status: ${response.status}, Body: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const studentScoreData: studentScore = responseData.json();
        return studentScoreData; // Trả về dữ liệu đã gửi đi

    } catch (error: any) {
        throw error;
    }
}

export {getStudentScoreByID}