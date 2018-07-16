var productoApp= angular.module("ProductoApp", []);

productoApp.controller("productoCtrl", function($scope, $http) {
	$scope.alerta = {titulo: '', cotenido: '', clase: 'alert-success', visible: false};
	$scope.productos = [];
	$scope.categorias = [];
	$scope.addProdData  = {codigo: 0, nombre: '', cantidadExistencia: 0, precioUnitario: 0, categoria: {codigo: 0, nombre: ''}};
	
	$scope.getProductos = function() {
		$http({method: 'GET', url: '/producto/', responseType: 'json'}).then(function success(response) {
			if (response.status == 200) {
				$scope.productos = response.data;
			}
		}, function error(response) {
			$scope.alerta.titulo = "Error";
			$scope.alerta.contenido = "no se puede visualizar la lista de productos";
			$scope.alerta.clase='alert-danger';
			$scope.alerta.visible = true;
			
		});
	};
	
	$scope.getCategorias = function() {
		$http({method: 'GET', url: '/productos/categorias/', responseType: 'json'}).then(function success(response) {
			if (response.status == 200) {
				$scope.categorias = response.data;
			}
		}, function error(response) {
			
		});
	}
	$scope.guardar= function(){
		$http({method: 'POST', url: '/producto/guardar/', responseType: 'json', data: JSON.stringify($scope.productos)}).then(function success(response) {
		}, function error(response) {
			
		});
	}
	
	$scope.openDialog = function(tipo, producto) {
		$("#dlgAddProd").modal('show');
		
		$scope.tipo = tipo;
		if (tipo === 'edit') {
			$scope.addProdData.codigo = producto.codigo;
			$scope.addProdData.nombre = producto.nombre;
			$scope.addProdData.cantidadExistencia = producto.cantidadExistencia;
			$scope.addProdData.precioUnitario = producto.precioUnitario;
			$scope.addProdData.categoria.codigo = producto.categoria.codigo;
			$scope.addProdData.categoria.nombre = producto.categoria.nombre;
			$scope.$apply();
		}
	};

	$scope.delProd = function(prod) {
		if (confirm('Está seguro que desea eliimnar el producto ' + prod.nombre + '?')) {
			$http({method: 'DELETE', url: '/productos/' + prod.codigo, responseType: 'json'}).then(function success(response) {
				if (response.status == 200) {
					$scope.alerta.titulo = "Éxito";
					$scope.alerta.contenido = "Producto eliminado satisfactoriamente";
					$scope.alerta.visible = true;
					
					$scope.getProductos();
					$scope.getCategorias();
					
				}
			}, function error(response) {
				$scope.alerta.titulo = "Error";
				$scope.alerta.contenido = "No se ha podido eliminar el producto";
				$scope.alerta.clase='alert-danger';
				$scope.alerta.visible = true;
			});
		}
	};
	
	$scope.hideAlert = function() {
		$scope.alerta.visible = false;
	};
	
	$scope.saveProd = function() {
		if ($scope.tipo === 'edit') {
//			https://stackoverflow.com/questions/24545072/angularjs-http-post-send-data-as-json
			$http({method: 'PUT', url: '/productos/' + $scope.addProdData.codigo, responseType: 'json', data: JSON.stringify($scope.addProdData)}).then(function success(response) {
				if (response.status == 200) {
					$scope.alerta.titulo = "Éxito";
					$scope.alerta.contenido = "Producto actualizado satisfactoriamente";
					$scope.alerta.visible = true;
					
					$("#dlgAddProd").modal('hide');
					$scope.getProductos();
					$scope.getCategorias();
					$scope.addProdData="";
				}
			}, function error(response) {
				$scope.alerta.titulo = "Error";
				$scope.alerta.contenido = "No se ha podido modificar el producto";
				$scope.alerta.clase='alert-danger';
				$scope.alerta.visible = true;
				
				
			});
		}else{
			$http({method: 'POST', url: '/productos/', responseType: 'json', data: JSON.stringify($scope.addProdData)}).then(function success(response) {
				if (response.status == 201) {
					$scope.alerta.titulo = "Éxito";
					$scope.alerta.contenido = "Producto agregado satisfactoriamente";
					$scope.alerta.visible = true;
					
					$("#dlgAddProd").modal('hide');
					$scope.getProductos();
					$scope.getCategorias();
					$scope.addProdData="";
				}
			}, function error(response) {
				$scope.alerta.titulo = "Error";
				$scope.alerta.contenido = "No se ha podido agregar el producto";
				$scope.alerta.clase='alert-danger';
				$scope.alerta.visible = true;
				$scope.addProdData.nombre="";
			});
		}
	}

	$scope.getProductos();
	$scope.getCategorias();
});