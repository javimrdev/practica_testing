import * as vm from './project.vm';
import * as am from './api/project.api-model';
import { mapProjectFromApiToVm } from './project.mapper';

describe('mapper test', () => {
  it('should return empty model when parameter is null', () => {
    //arrange
    const project: am.Project = null;

    //act
    const result: vm.Project = mapProjectFromApiToVm(project);

    //assert

    const expectedResult: vm.Project = vm.createEmptyProject();

    expect(result).toEqual(expectedResult);
  });

  it('should return empty model when parameter is undefined', () => {
    //arrange
    const project: am.Project = undefined;

    //act
    const result: vm.Project = mapProjectFromApiToVm(project);

    //assert
    const expectedResult: vm.Project = vm.createEmptyProject();

    expect(result).toEqual(expectedResult);
  });

  it('should return mapped object', () => {
    //arrange
    const mockEmployeeSummaryList: am.EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'Daniel Perez',
        isAssigned: true,
      },
    ];

    const mockProject: am.Project = {
      id: '1',
      name: 'Nombre',
      isActive: true,
      comments: 'Comentario',
      externalId: '1234',
      employees: mockEmployeeSummaryList,
    };

    //act
    const result: vm.Project = mapProjectFromApiToVm(mockProject);

    //assert
    const expectedEmployeeSummary: vm.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'Daniel Perez',
      },
    ];

    const expectedProject: vm.Project = {
      id: '1',
      name: 'Nombre',
      externalId: '1234',
      comments: 'Comentario',
      isActive: true,
      employees: expectedEmployeeSummary,
    };

    expect(result).toEqual(expectedProject);
  });
});
