const {create, getItems, getItemById, deleteItem, updateItem} = require('../../repository/item.repository');
const {getUserById} = require('../../repository/user.repository');

jest.mock('../../repository/item.repository');
jest.mock('../../repository/user.repository');

describe('Item Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all items', async () => {
        const mockItems = [
            {
                id: 1,
                name: 'item 1',
                damage: 10,
                description: 'description 1',
                price: 100
            },
            {
                id: 2,
                name: 'item 2',
                damage: 20,
                description: 'description 2',
                price: 200
            },
            {
                id: 3,
                name: 'item 2',
                damage: 20,
                description: 'description 2',
                price: 200
            }
        ];
        getItems.mockResolvedValue(mockItems);

        const {getAllItems} = require('./item.service');
        const result = await getAllItems();

        expect(getItems).toBeCalledTimes(1);
        expect(result).toEqual({allItems: mockItems});
    });

    it('should create new item', async () => {
        const mockUser = {
            id: 1,
            username: "test",
            password: "test",
            role: "user"
        }

        const mockPayload = {
            name: 'item 3',
            damage: 30,
            description: 'description 3',
            price: 300,
            userId: 1,
        }

        const mockNewItem = {
            name: 'item 3',
            damage: 30,
            description: 'description 3',
            price: 300,
            userId: 1,
            id: 3
        };

        getUserById.mockResolvedValue(mockUser);
        create.mockResolvedValue(mockNewItem);

        const {createNewItem} = require('./item.service');
        const result = await createNewItem(mockPayload);
        expect(create).toBeCalledTimes(1);
        expect(result).toEqual({item: mockNewItem});
    });

    it('should update item', async () => {
        const mockItems = [
            {
                id: 1,
                name: 'item 1',
                damage: 10,
                description: 'description 1',
                price: 100
            },
            {
                id: 2,
                name: 'item 2',
                damage: 20,
                description: 'description 2',
                price: 200
            },
            {
                id: 3,
                name: 'item 2',
                damage: 20,
                description: 'description 2',
                price: 200
            }
        ];

        const mockPayload = {
            name: 'item 1',
            damage: 10,
            description: 'description 1',
            price: 300
        }
        getItemById.mockResolvedValue(mockItems[0]);
        mockItems[0].price = 300;

        const {updateItemIfExist} = require('./item.service');
        const result = await updateItemIfExist(1, mockPayload);
        expect(updateItem).toBeCalledTimes(1);
        expect(result.item.price).toEqual(300);
    });

    it('should delete item', async () => {
        const mockItems = [
            {
                id: 1,
                name: 'item 1',
                damage: 10,
                description: 'description 1',
                price: 100
            },
            {
                id: 2,
                name: 'item 2',
                damage: 20,
                description: 'description 2',
                price: 200
            },
            {
                id: 3,
                name: 'item 2',
                damage: 20,
                description: 'description 2',
                price: 200
            }
        ];

        getItemById.mockResolvedValue(mockItems[0]);

        const {deleteItemIfExist} = require('./item.service');
        await deleteItemIfExist(1);
        expect(deleteItem).toBeCalledTimes(1);
    });
});
