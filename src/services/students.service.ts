import { RowDataPacket } from "mysql2";
import { InfoUpdateTypeStudent } from "../types";
import db from "../config/db";

export const getAllStudents = async () => {
    try {
        const query = "SELECT * FROM students";
        const [data] = await db.execute(query);
        return {
            data,
            error: null,
        };
    } catch (error) {
        return {
            data: [],
            error,
        };
    }
};

export const getStudentById = async (id: string) => {
    try {
        const query = "SELECT * FROM students WHERE id = ?;";
        const [data] = await db.execute<RowDataPacket[]>(query, [id]);

        return {
            data,
            error: null,
        };
    } catch (error) {
        return {
            data: [],
            error,
        };
    }
};

export const createStudent = async (
    firstName: string,
    lastName: string,
    email: string
) => {
    try {
        const query =
            "INSERT INTO students (firstName,lastName, email) VALUES(?,?,?);";
        await db.execute(query, [firstName, lastName, email]);
        return { message: "Created student" };
    } catch (error) {
        return { error };
    }
};

export const updateStudentById = async (
    infoUpdate: InfoUpdateTypeStudent,
    id: string
) => {
    try {
        const query = `UPDATE students 
                SET firstName = ?, lastName = ?, email = ?
                WHERE id = ?;
            `;
        await db.execute(query, [
            infoUpdate.firstName,
            infoUpdate.lastName,
            infoUpdate.email,
            id,
        ]);
        return { message: "Updated student" };
    } catch (error) {
        return { error };
    }
};

export const deleteStudentById = async (id: string) => {
    try {
        const queryStudent = `DELETE FROM students WHERE id = ?;`;
        await db.execute(queryStudent, [id]);
        const queryRegister = `DELETE FROM registerCourse WHERE idStudent = ?;`;
        await db.execute(queryRegister, [id]);
        return { message: "Deleted student" };
    } catch (error) {
        return { error };
    }
};
