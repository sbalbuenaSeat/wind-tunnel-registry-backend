import { expect, vi } from 'vitest';
import { Request } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { FlightType } from './schemas/entry.schema';

describe('EntriesController', () => {
  let entriesController: EntriesController;

  const mockEntriesService = {
    create: vi.fn(),
    importEntries: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  const mockUser = {
    _id: { toString: () => 'id' },
    email: 'tester@test.com',
  };

  const mockRequest = {
    user: mockUser,
  } as unknown as Request;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [
        {
          provide: EntriesService,
          useValue: mockEntriesService,
        },
      ],
    }).compile();

    entriesController = app.get<EntriesController>(EntriesController);

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new entry for userId', async () => {
      const createEntryDto = {
        type: FlightType.INDIVIDUAL,
        date: '2026-03-02',
        minutes: 15,
        note: 'new note',
      };

      const expectedResult = {
        _id: 'entryId',
        ...createEntryDto,
      };

      mockEntriesService.create.mockResolvedValue(expectedResult);

      const result = await entriesController.create(
        createEntryDto,
        mockRequest,
      );

      expect(mockEntriesService.create).toHaveBeenCalledWith(
        'id',
        createEntryDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });
  describe('update', () => {
    it('should update a entry for userId', async () => {
      const updateEntryDto = {
        type: FlightType.INDIVIDUAL,
        date: '2026-03-02',
        minutes: 15,
        note: 'note update',
      };

      const expectedResult = {
        _id: 'entryId',
        ...updateEntryDto,
      };

      mockEntriesService.update.mockResolvedValue(expectedResult);

      const result = await entriesController.update(
        'entryId',
        updateEntryDto,
        mockRequest,
      );

      expect(mockEntriesService.update).toHaveBeenCalledWith(
        'entryId',
        'id',
        updateEntryDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });
  describe('remove', () => {
    it('should remove a entry for userId', async () => {
      const mockResult = { ok: true };
      mockEntriesService.remove.mockResolvedValue(mockResult);

      const result = await entriesController.remove('entryId', mockRequest);

      expect(mockEntriesService.remove).toHaveBeenCalledWith('entryId', 'id');
      expect(result).toEqual(mockResult);
    });
  });
  describe('list', () => {
    it('should list only entries for a specific date when date is provided', async () => {
      const dateToFind = '2026-03-03';
      const allEntries = [
        {
          _id: '1',
          type: FlightType.INDIVIDUAL,
          date: '2026-03-02',
          minutes: 15,
        },
        {
          _id: '2',
          type: FlightType.SHARED,
          date: '2026-03-03',
          minutes: 30,
        },
        {
          _id: '3',
          type: FlightType.INDIVIDUAL,
          date: '2026-03-03',
          minutes: 10,
        },
      ];

      const filteredEntries = allEntries.filter((e) => e.date === dateToFind);
      mockEntriesService.findAll.mockResolvedValue(filteredEntries);

      const result = await entriesController.list(dateToFind, mockRequest);

      expect(mockEntriesService.findAll).toHaveBeenCalledWith('id', dateToFind);

      expect(result).toHaveLength(2);
      expect(result).toEqual(filteredEntries);
    });
    it('should list all entries for userId when no date is provided', async () => {
      const allEntries = [{ _id: '1' }, { _id: '2' }, { _id: '3' }];
      mockEntriesService.findAll.mockResolvedValue(allEntries);

      const result = await entriesController.list(undefined, mockRequest);

      expect(mockEntriesService.findAll).toHaveBeenCalledWith('id', undefined);
      expect(result).toHaveLength(3);
      expect(result).toEqual(allEntries);
    });
  });
  describe('import', () => {
    it('should import entries and inject userId into each one, but not return it', async () => {
      const entriesToImport = [
        {
          type: FlightType.INDIVIDUAL,
          date: '2026-03-02',
          minutes: 15,
          note: 'entry 1',
        },
        {
          type: FlightType.SHARED,
          date: '2026-03-03',
          minutes: 10,
          note: 'entry 2',
        },
        {
          type: FlightType.INDIVIDUAL,
          date: '2026-03-03',
          minutes: 15,
          note: 'entry 3',
        },
      ];

      mockEntriesService.importEntries.mockResolvedValue(entriesToImport);

      const result = await entriesController.import(
        { entries: entriesToImport },
        mockRequest,
      );
      expect(mockEntriesService.importEntries).toHaveBeenCalledWith(
        'id',
        entriesToImport,
      );
      expect(result).toEqual(entriesToImport);
    });
  });
});
