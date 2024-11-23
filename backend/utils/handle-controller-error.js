export const handleControllerError = (controllerName, res, error) => {
    console.error(`Error in ${controllerName} controller:`, error.message);
    res.status(500).json({ message: 'Internal Server Error' });
};
