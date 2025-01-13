const TaskController = require('../src/controllers/Task.controller');
const Task = require('../src/models/Task.model');

jest.mock('../src/models/Task.model');

describe('Task index', () => {
    
    it('should return 3 paginated data if limit is set to 3', async () => { 

        // Mock data to return
        const mockTasks = [
            { title: 'Task 1', description: 'Description 1' },
            { title: 'Task 2', description: 'Description 2' },
            { title: 'Task 3', description: 'Description 3' },
        ];

        // Mock chainable methods
        const skipMock = jest.fn().mockReturnThis();
        const limitMock = jest.fn().mockResolvedValue(mockTasks);

        // Mock Task.find to return the chainable methods
        Task.find = jest.fn(() => ({
            skip: skipMock,
            limit: limitMock,
        }));

        // Mock countDocuments
        Task.countDocuments = jest.fn().mockResolvedValue(10);

        // Mock req, res, and next
        const req = {
            query: {
                page: '1',
                limit: '3',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        // Call the controller method
        await TaskController.index(req, res, next);

        // Assertions for response
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            page: 1,
            limit: 3,
            total: 10,
            totalPages: 4,
            data: mockTasks,
        });

        // Assertions for model methods
        expect(Task.find).toHaveBeenCalledWith({});
        expect(skipMock).toHaveBeenCalledWith(0); // (page - 1) * limit
        expect(limitMock).toHaveBeenCalledWith(3); // limit
        expect(Task.countDocuments).toHaveBeenCalledWith({});

        // Ensure next() wasn't called with an error
        expect(next).not.toHaveBeenCalled();
    })
    
});
