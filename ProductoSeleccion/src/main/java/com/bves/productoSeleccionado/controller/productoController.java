package com.bves.productoSeleccionado.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bves.productoSeleccionado.entities.Producto;
import com.bves.productoSeleccionado.entities.ProductoGuardado;
import com.bves.productoSeleccionado.repositories.ProductoRepository;


@RestController
@RequestMapping("/producto")
public class productoController {
	@Autowired
	public ProductoRepository productoRepo;
	
	@RequestMapping(method = RequestMethod.GET, path = "/")
	public ResponseEntity<List<Producto>> listProductos() {
		List<Producto> listaProductos = productoRepo.findAll();
		for (Producto producto : listaProductos) {
			producto.setGuardado(producto.getProductoGuardado() !=null);
			producto.setDestacado(producto.getProductoGuardado() !=null && producto.getProductoGuardado().getDestacado().equals("S") );
		}
		return new ResponseEntity<List<Producto>>(listaProductos, HttpStatus.OK);
	}
	@RequestMapping(method= RequestMethod.POST, path="/guardar")
	public ResponseEntity<?> guardar(@RequestBody List<Producto> input){
		for (Producto producto : input) {
			if(producto.isGuardado()) {
				ProductoGuardado pg= new ProductoGuardado();
				pg.setId(producto.getCodigo());
				pg.setDestacado(producto.isDestacado()? "S": "N");
				producto.setProductoGuardado(pg);
			}else {
				producto.setProductoGuardado(null);
			}
			productoRepo.save(producto);
		}
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

}
