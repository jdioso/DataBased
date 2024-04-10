
// Add RSO controller
const addRSO = async (req, res) => {
    try {
        const { userID, name } = req.body;
        const rso = await RSO.create({ userID, name });
        return res.status(201).json({ message: 'RSO added successfully', rso });
    } catch (error) {
        console.error('Error adding RSO:', error);
        return res.status(500).json({ message: 'Failed to add RSO' });
    }
};

// Delete RSO controller
const deleteRSO = async (req, res) => {
    const rsold = req.params.rsold;
    try {
        const result = await RSO.destroy({ where: { rsold } });
        if (result > 0) {
            return res.status(200).json({ message: 'RSO deleted successfully' });
        } else {
            return res.status(404).json({ message: 'RSO not found' });
        }
    } catch (error) {
        console.error('Error deleting RSO:', error);
        return res.status(500).json({ message: 'Failed to delete RSO' });
    }
};

// Edit RSO controller
const editRSO = async (req, res) => {
    const rsold = req.params.rsold;
    const { userID, name } = req.body;
    try {
        const [updated] = await RSO.update({ userID, name }, { where: { rsold } });
        if (updated) {
            return res.status(200).json({ message: 'RSO updated successfully' });
        } else {
            return res.status(404).json({ message: 'RSO not found' });
        }
    } catch (error) {
        console.error('Error updating RSO:', error);
        return res.status(500).json({ message: 'Failed to update RSO' });
    }
};

// Export the controller functions
export { addRSO, deleteRSO, editRSO };
