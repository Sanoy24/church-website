const StaffMember = require("../models/StaffMember");

exports.getPublicStaffMembers = async (req, res) => {
    try {
        const members = await StaffMember.getPublic();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllStaffMembers = async (req, res) => {
    try {
        const members = await StaffMember.getAll();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStaffMemberById = async (req, res) => {
    try {
        const member = await StaffMember.getById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: "Staff member not found" });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createStaffMember = async (req, res) => {
    try {
        const id = await StaffMember.create(req.body);
        res.status(201).json({ id, message: "Staff member created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStaffMember = async (req, res) => {
    try {
        const affected = await StaffMember.update(req.params.id, req.body);
        if (affected === 0) {
            return res.status(404).json({ error: "Staff member not found" });
        }
        res.json({ message: "Staff member updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStaffMember = async (req, res) => {
    try {
        const affected = await StaffMember.delete(req.params.id);
        if (affected === 0) {
            return res.status(404).json({ error: "Staff member not found" });
        }
        res.json({ message: "Staff member deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
