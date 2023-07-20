import { RowDataPacket } from "mysql2";
import { InfoUpdateTypeCourse } from "../types";
import db from "../config/db";

export const getAllCourses = async () => {
    try {
        const query = "SELECT * FROM courses";
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

export const getCourseById = async (id: string) => {
    try {
        const query = "SELECT * FROM courses WHERE id = ?";
        const [data] = await db.execute<RowDataPacket[]>(query, [id]);

        return {
            data: data,
            error: null,
        };
    } catch (error) {
        return {
            data: [],
            error,
        };
    }
};

export const newCourse = async (
    nameCourse: string,
    descriptionCourse: string,
    numberOfVideos: string
) => {
    try {
        const query =
            "INSERT INTO courses (nameCourse,descriptionCourse, numberOfVideos) VALUES(?,?,?);";
        await db.execute(query, [
            nameCourse,
            descriptionCourse,
            numberOfVideos,
        ]);
        return { message: "Created course" };
    } catch (error) {
        return { error };
    }
};

export const updateCourseById = async (
    infoUpdate: InfoUpdateTypeCourse,
    id: string
) => {
    try {
        const query = `UPDATE courses 
                    SET nameCourse = ?, descriptionCourse = ?, numberOfVideos = ?
                    WHERE id = ?;
                `;
        await db.execute(query, [
            infoUpdate.nameCourse,
            infoUpdate.descriptionCourse,
            infoUpdate.numberOfVideos,
            id,
        ]);
        return { message: "Updated course" };
    } catch (error) {
        return { error };
    }
};

export const deleteCourseById = async (id: string) => {
    try {
        const queryCourse = "DELETE FROM courses WHERE id = ?";
        await db.execute(queryCourse, [id]);
        const queryRegister = `DELETE FROM registerCourse WHERE idCourse = ?;`;
        await db.execute(queryRegister, [id]);
        return { message: "Deleted course" };
    } catch (error) {
        return { error };
    }
};
